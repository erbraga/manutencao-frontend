export function IconePrincipal({className}){
    return(
        <button className={className}>
            <svg
                fill="currentColor" 
                viewBox="0 0 41.378 41.378" 

                width="24px" >
                
                
                <g> 
                <g> <g> 
                <path d="M40.897,16.601c-0.257-2.263-6.35,0-6.35,0l-0.359,
                    3.22c-0.133-0.076-0.268-0.15-0.41-0.213l-1.539-6.715 
                    c-0.564-3.197-2.977-5.552-6.494-5.431h-9.037c-0.055,
                    0.375-0.143,0.738-0.252,1.093h9.899c2.053,0,3.934,1.321,
                    4.448,3.502 l1.653,6.63c-0.104-0.003-0.207-0.013-0.312-0.013H12.978l0.005,
                    6.463h11.873v1.445H12.984l0.001,0.422h11.751v1.448H12.985 
                    l0.004,5.43h12.677v3.439c0,1.397,1.729,2.532,3.86,
                    2.532s3.857-1.134,3.857-2.532v-3.837c1.821-0.688,3.089-2.193,
                    3.089-3.944 v-6.153c0-1.36-0.768-2.571-1.957-3.366l6.382-0.345C40.897,
                    19.676,41.153,18.862,40.897,16.601z M33.586,28.344H26.62v-3.312 
                    h6.966V28.344z"/> 
                <rect x="12.808" y="27.003" width="0.177" height="1.448"/> 
                <rect x="12.929" y="25.137" width="0.055" height="1.445"/> 
                <path d="M15.337,6.488C15.331,3.71,13.821,1.29,11.572,0v5.993L7.851,
                    8.141L4.127,5.986V0c-2.245,1.29-3.758,3.71-3.76,6.488 c0,2.913,1.67,
                    5.437,4.104,6.676v0.032v24.649c0,0.976,0.393,1.859,1.033,2.5c0.639,
                    0.64,1.521,1.029,2.499,1.033 c1.944,0,3.524-1.578,3.531-3.532l-0.015-24.839C13.798,
                    11.725,15.334,9.283,15.337,6.488z M8.781,39.409 c-0.526,0.528-1.382,
                    0.528-1.912-0.001c-0.522-0.524-0.521-1.376,0.005-1.904c0.529-0.526,
                    1.382-0.526,1.904-0.004 C9.307,38.029,9.308,38.882,8.781,39.409z"/> 
                </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> 
                </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> 
                </g>
            </svg>
        </button>
    );
}

export function IconeAtualizar({className, onClick}){
    return(
        <button className={className} onClick = {onClick}>
            <svg 
                height="24px" 
                viewBox="0 0 24 24" 
                width="24px" 
                fill="currentColor">
                <path d="M0 0h24v24H0V0z" 
                    fill="none"/>
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 
                    8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 
                    0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
        </button>
    );
}

export function IconeEditar({className, onClick}){
    return(
        <button className={className} onClick = {onClick}>
            <svg
                width="24px"
                height="24px" 
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none" 
                >
                <path d="M0 0h24v24H0z" 
                    fill="none"/>
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 
                0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
        </button>
    );
}

export function IconeDeletar({className, onClick}){
    return(
        <button className={className} onClick = {onClick}>
            <svg 
                width="24px"
                height="24px" 
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none" 
                >
                <path d="M0 0h24v24H0V0z" 
                    fill="none"/>
                <path d="M8 9h8v10H8z" opacity=".3"/>
                <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/>
            </svg>
        </button>
    );
}

export function IconeSalvar({className, onClick}){
    return(
        <button className={className} onClick = {onClick}>
            <svg 
                height="24px" 
                viewBox="0 0 24 24" 
                width="24px" 
                fill="currentColor">
                <path d="M0 0h24v24H0V0z" 
                    fill="none"/>
                <path d="M17 3H3v18h18V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 
                    1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>            
            </svg>
        </button>
    );
}

export function IconeMais({className, onClick}){
    return(
        <button className={className} onClick = {onClick}>
            <svg 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="currentColor">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>            
            </svg>
        </button>
    );
}

export function IconeVoltar({className}){
    return(
        <button className={className}>
            <svg 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="currentColor">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 
                    224h487v80H313Z"/>           
            </svg>
        </button>
    );
}

export function IconeAlerta({className}){
    return(
        <button className={className}>
            <svg 
                width="24px"
                height="24px"
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 
                    0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 
                    0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </button>
    );
}



