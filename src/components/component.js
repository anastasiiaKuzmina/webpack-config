export default function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello world';
    element.classList.add("text");

    return element;
}
