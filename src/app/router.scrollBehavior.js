export default function (to, from, savedPosition) {
  console.log('to----------------------', to);
  console.log('savedPosition----------------------', savedPosition);
  if (to.hash) {
    return {
      selector: to.hash,
    };
  } else if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
}
