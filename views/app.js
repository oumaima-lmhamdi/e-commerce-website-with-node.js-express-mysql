const wrapper = document.querySelector(".wrapper");

wrapper.addEventListener('click', e=>{
    e.target.nodeName!=='P' && alert('Heyyy');
});