// عندما يتم إرسال النموذج لإضافة رصيد
document.getElementById('addBalanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const balance = document.getElementById('balance').value;

    // إرسال البيانات إلى الخادم باستخدام AJAX (نستخدم fetch هنا)
    fetch('add_balance.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}&balance=${balance}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('تم إضافة الرصيد بنجاح');
            loadUsers(); // إعادة تحميل قائمة المستخدمين
        } else {
            alert('حدث خطأ في إضافة الرصيد');
        }
    })
    .catch(error => console.error('Error:', error));
});

// تحميل قائمة المستخدمين من قاعدة البيانات
function loadUsers() {
    fetch('get_users.php')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        data.users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.username}</td><td>${user.balance}</td>`;
            userList.appendChild(row);
        });
    });
}

// تحميل المستخدمين عند فتح الصفحة
window.onload = loadUsers;
