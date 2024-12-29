
const icon = document.querySelector(".list-icon"); // اسم الكلاس حق الأيقونة
const navList = document.querySelector("nav");
const navListUl = document.querySelector("nav ul");

// إضافة حدث النقر للأيقونة وللقائمة
icon.addEventListener("click", toggleNav);
navList.addEventListener("click", toggleNav);

// دالة التبديل
function toggleNav(event) {
// تأكد إن المستخدم نقر على الأيقونة أو جزء nav
if (event.target === icon || event.target === navList) {
navList.classList.toggle("open");
navListUl.classList.toggle("open");

// تبديل الأيقونة
if (navList.classList.contains("open")) {
    icon.classList.remove("fa-bars"); // أيقونة القائمة
    icon.classList.add("fa-times");   // أيقونة الإغلاق
} else {
    icon.classList.remove("fa-times"); // أيقونة الإغلاق
    icon.classList.add("fa-bars");     // أيقونة القائمة
}
}
}
