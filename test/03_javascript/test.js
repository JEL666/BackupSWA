fetch('https://kdt.roto.codes/todos')
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
    })