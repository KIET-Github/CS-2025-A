
from django.shortcuts import render, redirect
from .models import *
from django.contrib import messages
import datetime
from django.core.paginator import Paginator
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
# from .search import search_data
from django.http import HttpResponse
# from .form import *
# from .all_mails import *
# from Templates import *
# Create your views here.

# Create your views here.
def home(request):
    return render(request,'index.html')

def mylogin(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user_obj = User.objects.filter(username=username)
        if not user_obj.exists():
            messages.warning(request, "Username does not exist.")  # recorded
            return redirect("/login/")
        user_obj = authenticate(username=username, password=password)
        if not user_obj:
            messages.warning(request, "Invalid credentials.")  # recorded
            return redirect("/login/")
        login(request, user_obj)
        print("Login successful")
        return redirect("/")
    return render(request, "login.html")

def myregister(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        cpassword = request.POST.get("cpassword")
        fname = request.POST.get("fname")
        lname = request.POST.get("lname")
        gender = request.POST.get("gender")
        phone = request.POST.get("phone")
        dob = request.POST.get("dob")
        
        # try:
        #     courseOrField = request.POST.get("courseOrField")
        #     bio = request.POST.get("bio")
        #     location = request.POST.get("location")
        # except:

        user_obj = User.objects.filter(username=username)
        if user_obj.exists():
            messages.warning(request, "Username is taken.")  # recorded
            return redirect("/register/")
        user_obj = User.objects.filter(email=email)
        if user_obj.exists():
            messages.warning(request, "Email is taken.")  # recorded
            return redirect("/register/")
        if password != cpassword:
            messages.warning(
                request, "Password and confirm password do not match."
            )  # recorded
            return redirect("/register/")
        user_obj = User(username=username, email=email,dob = dob,gender = gender ,first_name = fname, last_name = lname,phone_num = phone,is_superuser = True,is_staff = True)
        user_obj.set_password(password)
        user_obj.save()
        # registration_mail(email)
        messages.success(request, "Your account has been created.")
        return redirect("/login/")  # recorded
    return render(request, "signup.html")


# def home(request):
#     testimonials = []
#     plants = []
#     blogs = Module.objects.all()

#     context = {"testimonials": testimonials, "plants": plants, "blogs": blogs}
#     return render(request, "index.html", context)


def myLogout(request):
    logout(request)
    print("Logged out successful")
    return redirect("/")

def task(request):
    return render(request,'task.html')


# @login_required(login_url="/login")
# def dashboard(request):
#     context= []
#     today_tasks= list(Task.objects.filter(user =request.user,created_at__gte = datetime.datetime.now().date()).values())
#     print(today_tasks)
#     resource_obj = []
#     for t in today_tasks:
#         print(t["id"])
#         resources = list(Resource.objects.filter(task = t["id"]).order_by('-score').values())[:3]
#         print(resources)
#         # break
#         resource_obj.append(resources)
        
#     try:    
#         context = {"videos":  resource_obj }
#     except:
#         context = {"videos": ""}
#     # resources = Resource.objects.filter(tas)
#     return render(request, "dashboardd.html",context)
    
