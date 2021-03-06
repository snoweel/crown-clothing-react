import React from "react";
import  './collection-preview.styles.scss'
import CollectionItem from "../collection-item/collection-item.component";
// const CollectionPreview = ({title,items}) => (
//     <div className='collection-preview'>
//         <h1 className='title'>{title.toUpperCase()} </h1>
//         <div className='preview'>
//             {
//                 items
//                     .filter((item,idx)=>idx<4)
//                     .map(({id,...itemProps})=>(
//                         <CollectionItem key={id} {...itemProps} />
//                 ))
//             }
//         </div>
//     </div>
// )

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                .filter((item, idx) => idx < 4)
                .map(item =>{
                    // console.log('CollectionItem call');
                    // console.table({ id, ...otherItemProps });
                   return  (
                        <CollectionItem key={item.id} item={item} />
                    )
                }
                )}
        </div>
    </div>
);

export default CollectionPreview;