from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from ..serializer import PostSerializer
from ..serializer import PictureSerializer
from ..models import Post
from ..models import Picture

@api_view(['GET'])
def getHomePage(request):
    posts = Post.objects.order_by('-created_at')[:2]
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)






