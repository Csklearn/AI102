import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

async def main():
    urls=[
        'https://www.geeksforgeeks.org/python/create-virtual-environment-using-venv-python/',
        'https://carbondesignsystem.com/contributing/get-started/overview/'
    ]
    async with AsyncWebCrawler() as crawler:
        results = await crawler.arun_many(
            urls
        )
        for result in results:
            if result.success:
                print(f'{result.url} \n {result.markdown}')
                with open("./venv/demofile.txt", "a",encoding='utf-8') as f:
                    f.write(result.markdown)
                    print('file written')
            else:
                print('{result.url}-Failure')

if __name__ == "__main__":
    asyncio.run(main())

