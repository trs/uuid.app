export function useClipboard(): [(text: string) => boolean] {
  const container: HTMLElement = document.querySelector('body') as HTMLElement;

  const createCopyElement = (text: string) => {
    const element = document.createElement('textarea');
    // Prevent zooming on iOS
    element.style.fontSize = '12pt';
    // Reset box model
    element.style.border = '0';
    element.style.padding = '0';
    element.style.margin = '0';
    // Move element out of screen horizontally
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    // Move element to the same position vertically
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    element.style.top = `${yPosition}px`;

    element.setAttribute('readonly', '');
    element.value = text;

    container.appendChild(element);

    return element;
  };

  const tryCopy = (element: HTMLTextAreaElement) => {
    try {
      element.select();
      element.setSelectionRange(0, element.value.length);
      return document.execCommand('copy');
    } catch (err) {
      return false;
    } finally {
      const selection = window.getSelection();
      if (selection) selection.removeAllRanges();
    }
  }

  const removeCopyElement = (element: HTMLTextAreaElement) => {
    container.removeChild(element);
  }

  const setClipboard = (text: string) => {
    const element = createCopyElement(text);
    const success = tryCopy(element);
    removeCopyElement(element);
    return success;
  };

  return [setClipboard];
}
