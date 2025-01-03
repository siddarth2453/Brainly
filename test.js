
const randomHash = (len) => {

    let options = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let length = options.length
    console.log('length: ' + length);
    

    let randomString = ""

    for(let i=0 ; i<len ; i++){
    console.log(Math.random() * length ); 
    }

    return randomString
}

console.log('Final String: ' + randomHash(10));
