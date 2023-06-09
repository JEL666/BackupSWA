function TimerButton({$target, text, timer = 3000, onClick}) {
    const button = new ToggleButton({$target, text, onClick: () => {
        setTimeout(() => {
            button.setState({
                ...button.state,
                toggled: !button.state.toggled
            })
        }, timer)
    }})
}

function ToggleButton({
    $target,
    text,
    onClick
}) {
    console.log($target);
    const $button = document.createElement('button');
    let clickCount = 0;
    $target.appendChild($button);

    this.state = {
        clickCount: 0,
        toggled: false
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $button.textContent = text;
        $button.style.textDecoration =
            this.state.toggled ? "line-through" : "none";
    }

    $button.addEventListener("click", () => {
        this.setState({
            clickCount: this.state.clickCount + 1,
            toggled: !this.state.toggled
        })
        if(onClick){
            onClick(this.state.clickCount);
        }
    })

    

    this.render();
}



function ButtonGroup({
    $target,
    buttons
}) {
    const $group = document.createElement('div');
    let isInit = false;

    this.render = () => {
        if(!isInit){
            buttons.forEach(({type, ...props}) => {
                console.log(type, props);
                if(type === 'toggle'){
                    new ToggleButton({$target: $group, ...props});
                }
                else if(type === "timer"){
                    new TimerButton({$target: $group, ...props});
                }
            })

            $target.appendChild($group);
            isInit = true;
            
        }
        
    }
    this.render();
}
const $app = document.querySelector("#app");
new ButtonGroup({
    $target: $app,
    buttons: [
        {
            type: 'toggle',
            text: '버튼1'
        },
        {
            type: 'toggle',
            text: '버튼2'
        },
        {
            type: 'timer',
            text: '타이머',
            timer: 500
        }
    ]
})