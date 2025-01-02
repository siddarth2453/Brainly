const randomHash = (len:number) => {
    const options = 'qwertyuiopasdfghjklzxcvbnm1234567890'
    let random = ""
    for(let i=0; i < len; i++){
        random = options[Math.floor(Math.random()*options.length)] + random
    }

    return random;
}

export default randomHash