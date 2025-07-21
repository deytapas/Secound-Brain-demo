export const random = (num: number) => {
    const options = "djfjgsjfgjsdfkgslkdfgklsdhgfkhsd3453453534534";
    
    let ans = "";

    for (let index = 0; index < num; index++) {
        ans += options[Math.floor((Math.random() * options.length))];
        
    }

    return ans;
}