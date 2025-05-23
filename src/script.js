import readXlsxFile from 'read-excel-file';
const base_url = import.meta.env.BASE_URL;

function setup_video(video)
{
    let video_iframe=document.getElementById("video_iframe");
    video_iframe.src=video["Embed"];
    document.getElementById("video_id").innerHTML=video["#"];
    document.getElementById("video_id_input").value=video["#"];
    document.getElementById("video_type").innerHTML=video["Playlist_Name"];
    document.getElementById("video_title").innerHTML=video["Video_Name"];

    let video_link=document.getElementById("video_link");
    video_link.href=video["Link"];
    video_link.innerHTML=video_link;
}
export function select_random_video(required_type)
{
    console.log(`Select Random Video ${required_type}`);
    let video=null;
    let tries=0;
    while(true)
    {
        const roll=Math.floor(Math.random()*clean_videos.length);
    
        video=clean_videos[roll];
        video_id=video["#"];
        if(video["Playlist_Name"]==required_type || required_type.length<=3||tries>=100)
        {
            console.log(clean_videos[roll]);
            break;
        }
        tries+=1;
    }
    setup_video(video);
}
export function select_video_by_id()
{
    const target_id=parseInt(document.getElementById("video_id_input").value);
    let videos_copy=[...clean_videos];
    videos_copy=videos_copy.filter(video=>video["#"]==target_id);
    const video=videos_copy[0];
    setup_video(video);
}
async function to_dictionaries(rows)
{
    //The first row holds the column names. The rest of the rows hold the column values.
    let dictionaries=[];
    for(let i=1;i<rows.length;i++)
    {
        let dictionary={};
        for(let j=0;j<rows[0].length;j++)
        {
            dictionary[rows[0][j]]=rows[i][j];
        }
        dictionaries.push(dictionary)
    }
    return dictionaries;
}
function get_excel_data(file_name)
{
    fetch(`${base_url}${file_name}`)
    .then(response => response.blob())
    .then(blob => readXlsxFile(blob))
    .then(async(rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.\
        console.log(rows);
        clean_videos=await to_dictionaries(rows);
        console.log(clean_videos);
        document.getElementById("video_id_input").max=clean_videos.length;
        select_random_video("");
    });
}

let clean_videos=null;
let video_id=0;
get_excel_data("clean-videos.xlsx");