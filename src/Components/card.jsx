import React from "react";

export default function card({ image }) {
  const tag = image.tags.split(",");

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={image.webformatURL} alt="" className="w-full" />

      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl">{image.user}</div>
        <ul>
          <li>
            <strong>Views:{image.views}</strong>
          </li>
          <li>
            <strong>Download:{image.downloads}</strong>
          </li>
          <li>
            <strong>likes :{image.likes}</strong>
          </li>
        </ul>
      </div>
<div className="mx-6">
     {tag.map((tags) => (
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm mr-3 my-1 text-gray-700">
          #{tags}
        </span> 
      ))}
</div>
     
    </div>
  );
}
