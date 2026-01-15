from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

class Handler(FileSystemEventHandler):
    def on_any_event(self, event):
        print(f'Event: {event}')

observer = Observer()
observer.schedule(Handler(), '/Users/dan/Documents/ws/tracking-ai-course/docs', recursive=True)
observer.start()
print('Watching /Users/dan/Documents/ws/tracking-ai-course/docs/... touch a file')
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()
observer.join()
