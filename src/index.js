function getComponent(){
    return import(/*webpackChunkName:"lodash"*/'lodash').then(({default:_})=>{
        var element=document.createElement('div');
        console.log(_)
        element.innerHTML=_.join(['DELL','Lee'],'_');
        return element
    })
}
getComponent().then(element=>{
    console.log(element);
    document.body.appendChild(element);
})