from django.urls import path
from . import views


urlpatterns = [
    path('', views.getProfile),
    path('history/<str:post_category>', views.getHistoryPost)
]