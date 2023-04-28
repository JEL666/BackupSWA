export default function ToDoForm({$target, onSubmit}){
    const $form = document.createElement('form')
    $target.appendChild($form)
    
    this.isInit = false

    this.render = () => {
        $form.innerHTML = `
            <input type="text" name="todo" />
            <button>Add</button>
        `

        if(!this.isInit){
            $form.addEventListener('submit', e => {
                e.preventDefault()
                const $todo = $form.querySelector('input[name=todo]')
                const text = $todo.value

                if(text.length > 1){
                    $todo.value = ''
                    onSubmit(text)
                }
            })
            this.isInit = true
        }
    }

    this.render()
}