const API_URL = "https://your-api-url.com/api";  // هنا ضع رابط الـ API الخاص بك

// جلب قائمة المستخدمين
async function fetchUsers() {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN' // إذا كان الـ API يحتاج توكن مصادقة
            }
        });
        const users = await response.json();
        displayUsers(users);  // عرض المستخدمين في الجدول
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// استعراض المستخدمين في الجدول
function displayUsers(users) {
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
        deleteButton.onclick = () => removeBalance(user.id); // إرسال الـ ID لمسح الرصيد
        actionCell.appendChild(deleteButton);

        row.appendChild(usernameCell);
        row.appendChild(balanceCell);
        row.appendChild(actionCell);

        userList.appendChild(row);
    });
}

// إضافة رصيد للمستخدم
document.getElementById("addBalanceForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const balance = parseInt(document.getElementById("balance").value);

    try {
        const response = await fetch(`${API_URL}/users/add-balance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN' // إذا كان الـ API يحتاج توكن مصادقة
            },
            body: JSON.stringify({ username, balance })
        });

        if (response.ok) {
            alert('تم إضافة الرصيد بنجاح!');
            fetchUsers();  // تحديث عرض المستخدمين
        } else {
            alert('حدث خطأ في إضافة الرصيد');
        }
    } catch (error) {
        console.error("Error adding balance:", error);
    }

    document.getElementById("addBalanceForm").reset(); // إعادة تعيين النموذج بعد الإرسال
});

// مسح الرصيد لمستخدم معين
async function removeBalance(userId) {
    try {
        const response = await fetch(`${API_URL}/users/remove-balance/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN'
            }
        });

        if (response.ok) {
            alert('تم مسح الرصيد بنجاح!');
            fetchUsers();  // تحديث عرض المستخدمين
        } else {
            alert('حدث خطأ في مسح الرصيد');
        }
    } catch (error) {
        console.error("Error removing balance:", error);
    }
}

// مسح رصيد جميع المستخدمين
document.getElementById("clearAllBalance").addEventListener("click", async function() {
    try {
        const response = await fetch(`${API_URL}/users/clear-all-balance`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN'
            }
        });

        if (response.ok) {
            alert('تم مسح رصيد جميع المستخدمين!');
            fetchUsers();  // تحديث عرض المستخدمين
        } else {
            alert('حدث خطأ في مسح رصيد جميع المستخدمين');
        }
    } catch (error) {
        console.error("Error clearing all balances:", error);
    }
});

// عرض المستخدمين عند تحميل الصفحة
fetchUsers();
