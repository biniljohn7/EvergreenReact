import styled from "styled-components";

const style = styled.div`
position: fixed;
left: 50%;
z-index: 9999;
top: -10px;
background-color: #fff;
transform: translateX(-50%);
padding: 20px 34px 20px 17px;
border-radius: 5px;
box-shadow: 0 5px 20px 3px rgba(0, 0, 0, .5);
font-size: 1.05em;
color: #4d4d4d;
max-width: calc(100% - 30px) schew(-5);
animation: toastanim .4s forwards;
opacity: 0;

&.active {
    color:red;
}
&.closing {
    animation: toastanim2 .7s forwards;
}
&.msg-tp-1 {
    background-color:#4da328;
    color:#fff;
}
&.msg-tp-2 {
    background-color:#ef0d0d;
    color:#fff;
}

.close-btn {
    position: absolute;
    cursor: pointer;
    right: 2px;
    padding: 5px;
    top: 14px;
    font-size: 20px;
} 
.close-btn:hover {
    color: #f00;
}

@keyframes toastanim {
    100% {
        opacity:1;
        top:10px;
    }
}
@keyframes toastanim2 {
    0% {
        opacity:1;
        top:10px;
    }
    100% {
        opacity:0;
        top:-10px;
    }
}
`

export default style