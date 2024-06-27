from locust import HttpUser, TaskSet, task, between

class VideoTasks(TaskSet):
    @task(1)
    def list_videos(self):
        self.client.get("/videoList")

    @task(2)
    def get_video_url(self):
        self.client.get("/Sintel.mp4")
        
    @task(3)
    def get_video_url(self):
        self.client.get("/TearsOfSteel.mp4") 
    
    @task(4)
    def get_video_url(self):
        self.client.get("/ForBiggerJoyrides.mp4") 
        

class VideoUser(HttpUser):
    tasks = [VideoTasks]
    wait_time = between(1, 3)
