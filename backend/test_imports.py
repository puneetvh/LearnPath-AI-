import sys
import os

# Add the current directory to sys.path so we can import 'backend'
sys.path.append(os.getcwd())

try:
    from backend.models import StudyPlan
    from backend.agent import agent
    from backend.main import app
    print("Backend imports successful")
except ImportError as e:
    print(f"Import failed: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Other error: {e}")
    sys.exit(1)
