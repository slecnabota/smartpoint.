<template>
  <div class="editor">
    <div id="editor-js"></div>
    <button @click="saveData" class="editor-btn">Изменить</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch, nextTick, emit} from 'vue';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';

export default defineComponent({
  name: 'FeatureEditor',
  props: {
    initialData: String,
  },
  setup(props, {emit}) {
    const editor = ref<EditorJS | null>(null);

    const initEditor = (data) => {
      if (editor.value) {
        editor.value.destroy();
        editor.value = null;
      }

      nextTick(() => {
        editor.value = new EditorJS({
          holder: 'editor-js',
          minHeight: 0,
          placeholder: 'Введите текст...',
          tools: {list: List},
          data,
        });
      });
    };

    const htmlToListData = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const items = Array.from(doc.querySelectorAll('li')).map(li => li.textContent?.trim() || '');
      return {
        time: Date.now(),
        blocks: [
          {
            type: "list",
            data: {
              style: "unordered",
              items,
            },
          },
        ],
        version: "2.22.2",
      };
    };

    onMounted(() => {
      initEditor(htmlToListData(props.initialData));
    });

    watch(() => props.initialData, (newVal) => {
      const newData = htmlToListData(newVal);
      initEditor(newData);
    });

    const saveData = async () => {
      if (!editor.value) return;

      const outputData = await editor.value.save();
      const html = jsonToHtml(outputData);
      emit('update:features', html);
    };

    const jsonToHtml = (data) => {
      let html = "<ul>";
      data.blocks.forEach((block) => {
        if (block.type === "list") {
          block.data.items.forEach(item => {
            html += `<li>${item}</li>`;
          });
        }
      });
      html += "</ul>";
      return html;
    };

    return {
      saveData,
    };
  },
});
</script>
<style scoped lang="scss">
@import '@/styles/mixins.scss';

.editor {
  &-btn {
    color: var(--green);
    @include SemiBold15;
    margin-top: 10px;
  }
}
</style>