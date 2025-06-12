function showSalary(users, age) {
  const filteredUsers = users.filter(user => user.age <= age);
  const resultLines = filteredUsers.map(user => `${user.name}, ${user.balance}`);
  return resultLines.join('\n');
}

let user1 = {
  "balance": "$7,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 40,
  "name": "Golden Branch",
  "gender": "male",
  "greeting": "Hello, Golden Branch! You have 7 unread messages.",
  "favouriteFruit": "banana"
};

let user2 = {
  "balance": "$6,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 30,
  "name": "Ольга Петрова",
  "gender": "female",
  "greeting": "Hello, Ольга! You have 7 unread messages.",
  "favouriteFruit": "banana"
};



let user3 = {
  "balance": "$11,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 22,
  "name": "Сергей Иванов",
  "gender": "male",
  "greeting": "Hello, Сергей! You have 7 unread messages.",
  "favouriteFruit": "banana"
};


let user4 = {
  "balance": "$10,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 27,
  "name": "Василий Петров",
  "gender": "male",
  "greeting": "Hello, Василий! You have 7 unread messages.",
  "favouriteFruit": "banana"
};