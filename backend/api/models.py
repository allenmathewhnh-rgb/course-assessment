from django.db import models



class Module(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    display_order = models.IntegerField()

    def __str__(self):
        return self.title


class Feedback(models.Model):
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="feedbacks"
    )
    name = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.module.title}"