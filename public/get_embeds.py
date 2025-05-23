import pandas as pd
def get_embed(row):
    link=row["Link"]
    link=link.split("/")[-1]
    embed="https://www.youtube.com/embed/"+link
    return embed

clean_videos=pd.read_excel("clean-videos.xlsx")
clean_videos["Embed"]=clean_videos.apply(get_embed,axis=1)

print(clean_videos.head())
clean_videos.to_excel("clean-videos-updated.xlsx",index=False)