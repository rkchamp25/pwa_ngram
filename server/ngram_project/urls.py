from django.urls import path
from . import views

urlpatterns = [
    path('api/ngrams/', views.get_ngrams, name='get-ngrams'),
]
