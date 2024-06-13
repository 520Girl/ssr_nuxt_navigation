export default async function ({store,redirect}) {
  if (!store.getters.imageRouter){
    await store.dispatch('addBaseConfig')
    if (store.getters.imageRouter !== true){
      return redirect('/404')
    }
  }

}
