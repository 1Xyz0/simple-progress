const container = document.getElementById("container-computer");

function StartCarding(title, Resultmsg, DurationPerOne)
{
    container.innerHTML = null;

    container.style.display = "flex";

    let init = $(`
    <div id="computer-header">${title}</div>
    <div id="copying-progressbar"></div>`);

    $(container).append(init);

    const progressbar = document.getElementById("copying-progressbar");


    let progress = 0;

    const interval = setInterval(() => {
    if (progress >= 10) {
        clearInterval(interval);
        
        let html = $(`<div id="notify">${Resultmsg}</div>`);

        $(container).append(html);

        setTimeout(() => {
            container.style.display = "none";
            container.innerHTML = null;

            fetch(`https://${GetParentResourceName()}/CardingComplete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    carding: true
                })
            })
        }, 2500);


    } else {
        progress += 1; 
        
        let html = $(`<div class="copying-box"></div>`);

        $(progressbar).append(html);
    }
    }, DurationPerOne);
}


addEventListener("message", function(event)
{
    const e = event.data;

    if (e.action == "start")
    {
        StartCarding(e.title, e.ResultMsg, e.DurationPerOne);
    }
})