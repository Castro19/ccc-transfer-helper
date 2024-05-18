import os

def main():
    current_dir = os.getcwd()  # Get the current directory
    print(current_dir)
    for filename in os.listdir(current_dir):
        # Check if it's a JSON file, and not the script itself
        if filename.endswith(".json") and filename != "modify_filename.py":
            # Split the filename into parts
            base_name, _, _ = filename.partition("_")  # Keep only the part before "_"

            new_filename = base_name + ".json" 
            
            old_path = os.path.join(current_dir, filename)
            new_path = os.path.join(current_dir, new_filename)

            os.rename(old_path, new_path)  # Rename the file
            print(f"Renamed: {filename} -> {new_filename}")

if __name__ == "__main__":
    main()