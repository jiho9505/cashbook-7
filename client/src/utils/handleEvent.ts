export default {
  fire: (type: string, data?: object): void => {
    document.dispatchEvent(new CustomEvent(type, { detail: data }));
  },
  subscribe: (type: string, listener: EventListenerOrEventListenerObject): void => {
    document.addEventListener(type, listener);
  },
};
