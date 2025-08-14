from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer

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




