export default function wrapper(promise, toggleLoader) {
  toggleLoader(true);

  return promise
    .then(res => {
      toggleLoader(false);
      return res;
    });
}

