from django.db import models

# Create your models here.
class Todo(models.Model):
    title= models.CharField(max_length=200)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
     return self.title 
    
class User(models.Model) :
   name = models.CharField(max_length=100)
   email = models.EmailField(unique=True, default="default@example.com")
   password = models.CharField(max_length=10)

   def __str__(self):
      return self.name
