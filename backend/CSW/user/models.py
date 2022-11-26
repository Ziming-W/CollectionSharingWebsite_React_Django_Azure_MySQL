from django.db import models
from django.contrib.auth.models import User
import uuid

class Post(models.Model):
    belongToUser = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    descriptions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ANTIQUE = "AT"
    STARCARD = "SC"
    PAINTING = "PT"
    COIN = "CN"
    BAG = "BG"
    SHOES = "SE"
    AUTOGRAPH = "AH"
    SOUVENIR = "SR"
    OTHERS = "OS"
    CATEGORY_CHOICES = [
        (ANTIQUE, "antique"), 
        (STARCARD, "starCard"), 
        (PAINTING, "painting"), 
        (COIN, "coin"), 
        (BAG, "bag"), 
        (SHOES, "shoes"), 
        (AUTOGRAPH, "autograph"),   
        (SOUVENIR, "souvenir"), 
        (OTHERS, "others"), 
    ]
    category = models.CharField(
        max_length=2, 
        choices = CATEGORY_CHOICES, 
        default = OTHERS
    )
    
    
def rename_pic(instance, filename):
    ext = filename.split('.')[-1]
    front = filename.split('.')[0]
    filename = str(uuid.uuid4()) + ("__%s__%s.%s" % (str(instance.belongToPost), front, ext))
    #filename = "%s__%s.%s" % (instance.belongToPost, front, ext)
    return 'pictures/' + filename
        
class Picture(models.Model):
    belongToPost = models.ForeignKey(Post, related_name='pictures', on_delete=models.CASCADE)
    #descriptions = models.TextField()
    #image = models.ImageField(upload_to='pictures')
    image = models.ImageField(upload_to=rename_pic)



