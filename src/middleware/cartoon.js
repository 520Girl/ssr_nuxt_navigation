export default async function ({store,redirect,$api}) {
  if (!store.getters.cartoonRouter){
    await store.dispatch('addBaseConfig')
    if (store.getters.cartoonRouter !== true){
      return redirect('/404')
    }
  }

}
