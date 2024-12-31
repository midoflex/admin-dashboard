// نموذج البيانات للمستخدمين
let users = [
    { username: "user1", balance: 100 },
    { username: "user2", balance: 150 },
    { username: "user3", balance: 200 }
];

// استعراض المستخدمين في الجدول
function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = ''; // مسح محتوى الجدول الحالي

    users.forEach(user => {
        const row = document.createElement("tr");
        
        const usernameCell = document.createElement("td");
        usernameCell.textContent = user.username;
        
        const balanceCell = document.createElement("td");
        balanceCell.textContent = user.balance;
        
        // خلية زر مسح الرصيد
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "مسح الرصيد";
        deleteButton.onclick = () => removeBalance(user.username); // عند الضغط على الزر يتم مسح الرصيد
        actionCell.appendChild(deleteButton);

        row.appendChild(usernameCell);
        row.appendChild(balanceCell);
        row.appendChild(actionCell);

        userList.appendChild(row);
    });
}

// مسح الرصيد لمستخدم معين
function removeBalance(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        user.balance = 0; // مسح الرصيد
        displayUsers(); // تحديث العرض
    }
}

// مسح رصيد جميع المستخدمين
document.getElementById("clearAllBalance").addEventListener("click", function() {
    users.forEach(user => user.balance = 0); // مسح رصيد جميع المستخدمين
    displayUsers(); // تحديث العرض
});

// إضافة رصيد للمستخدم
document.getElementById("addBalanceForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const balance = parseInt(document.getElementById("balance").value);

    // البحث عن المستخدم وإضافة الرصيد له
    const user = users.find(u => u.username === username);
    if (user) {
        user.balance += balance; // إضافة الرصيد
    } else {
        // إذا لم يتم العثور على المستخدم، نقوم بإضافته
        users.push({ username, balance });
    }

    displayUsers(); // تحديث العرض
    document.getElementById("addBalanceForm").reset(); // إعادة تعيين النموذج بعد الإرسال
});

// عرض المستخدمين عند تحميل الصفحة
displayUsers();
