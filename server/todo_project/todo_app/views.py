from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Todo,User
from .serializers import TodoSerializer,UserSerializer

# Create your views here.
@api_view(['GET','POST'])
def todo_list(request):
    if request.method=='GET':
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method =='POST':
        serializer = TodoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)



# @api_view(['PUT','DELETE'])
# def todo_updel(request,pk):
#     if request.method=='PUT':
#         todo = get_object_or_404(Todo,pk=pk)
#         serializer = TodoSerializer(todo,data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)
#     elif request.method =='DELETE':
#         todo= get_object_or_404(Todo,pk=pk) 
#         todo.delete()

@api_view(['PUT','DELETE'])
def todo_updel(request,pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({"err": "todo not found"},status = status.HTTP_400_BAD_REQUEST )
    if request.method=='PUT':
        serializer = TodoSerializer(todo,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)
    elif request.method =='DELETE':
        todo.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
# User Views
@api_view(['POST'])
def login(request):
    name = request.data.get("name")
    password = request.data.get("password")

    try:
        user = User.objects.get(name=name)
        if user.password == password:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({ "error": "Invalid password" }, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({ "error": "User does not exist" })
    
@api_view(['POST'])
def register(request):
    email = request.data.get("email")
    try : 
        user = User.objects.get(email=email)
        return Response({"error":"User already exist"},status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist :
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
          serializer.save()
          return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)
    



