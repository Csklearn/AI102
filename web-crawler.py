import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
from blobUploader import AzureBlobFileUploader

async def main():
    urls=[
        'https://www.geeksforgeeks.org/python/create-virtual-environment-using-venv-python',
        'https://carbondesignsystem.com/contributing/get-started/overview'
    ]
    async with AsyncWebCrawler() as crawler:
        results = await crawler.arun_many(
            urls
        )
        for result in results:
            if result.success:
                print(f'{result.url} \n {result.markdown}')
                with open(f"./files/{result.url.split('/')[-1]}.txt", "a",encoding='utf-8') as f:
                    f.write(result.markdown)
                    print('file written')
            else:
                print('{result.url}-Failure')
        blobuploader()
            
def blobuploader():
    azure_blob_file_uploader = AzureBlobFileUploader()
    azure_blob_file_uploader.upload_all_images_in_folder()

if __name__ == "__main__":
    asyncio.run(main())
    
