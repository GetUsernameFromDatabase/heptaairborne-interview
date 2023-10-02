"""
Python script to generate raw SQL changeset

Python 3.11.5
"""
import requests
import json
import time


class ImageFetcher:
    def __init__(self, out_file="00001_insert_images.sql", max_images=15000):
        self.max_images = max_images
        self.out_file = out_file
        self.images = []

    def fetch_images(self, page: int):
        """
        Fetch images from https://picsum.photos/v2/list
        """
        try:
            response = requests.get(
                f"https://picsum.photos/v2/list?page={page}&limit=100"
            )
            if response.status_code == 429:
                sleep_time = 60
                print(f"Rate limit exceeded. Waiting for {sleep_time} seconds.")
                time.sleep(sleep_time)
                return self.fetch_images(page)
            response.raise_for_status()
            return json.loads(response.text)
        except requests.exceptions.RequestException as e:
            print(f"Error fetching images: {e}")
            return []

    def fetch_all_images(self):
        """
        Fetches all images it can from https://picsum.photos/v2/list
        until self.max_images reached or no new data
        """
        page = 1
        while len(self.images) < self.max_images:
            new_images = self.fetch_images(page)
            if not new_images:
                print(f"No more images found at page {page}.")
                break
            self.images.extend(new_images)
            if len(self.images) > self.max_images:
                self.images = self.images[: self.max_images]
            page += 1

    def ensure_max_images(self):
        self.fetch_all_images()
        while len(self.images) < self.max_images:
            self.images.extend(self.images)
            if len(self.images) > self.max_images:
                self.images = self.images[: self.max_images]

    def image_as_sql_insert(self, image):
        """
        THIS DOES NOT PROPERLY SANITIZE SQL
        """
        safe_url = image["download_url"].replace("'", "''")
        safe_author = image["author"].replace("'", "''")
        return f"INSERT INTO images (image_url, width, height, description) VALUES ('{safe_url}', {image['width']}, {image['height']}, '{safe_author}');"

    def get_liquibase_header(self):
        changeset_id = self.out_file.split(".", 1)[0]
        lines = ["-- liquibase formatted sql", f"-- changeset devtool:{changeset_id}"]
        return "\n".join(lines)

    def save_images_to_sql(self):
        with open(self.out_file, "w", encoding="utf-8") as f:
            f.write(self.get_liquibase_header() + "\n")
            for image in self.images:
                f.write(self.image_as_sql_insert(image) + "\n")


def main():
    imageFetcher = ImageFetcher()
    imageFetcher.ensure_max_images()
    imageFetcher.save_images_to_sql()


if __name__ == "__main__":
    main()
