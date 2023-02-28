
const object = {};
for (let step = 0; step <= 100; step++) {    
    const randomnumber = Math.floor(Math.random() * 20 + 1);

    if (!object[randomnumber]) object[randomnumber]=1;
    object[randomnumber]++;
  }
  console.log(object);