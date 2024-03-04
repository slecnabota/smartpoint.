const pages = {

}
// Переберите массив карточек в объекте pages.booking
for (const card of pages.booking) {
    // Проверьте, есть ли у карточки свойство heading
    if (card.heading) {
        console.log(card.heading);
    }
}
export default pages;