import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Meeting() {
    const navigate = useNavigate();
    const meetlink = (useParams().link.match(/([a-f0-9]{3,4})-([a-f0-9]{3,4})-([a-f0-9]{3,4})$/) !== null);

    useEffect(() => {

        if (meetlink === false) {
            navigate('/error');
        }
    });

    return (
        <>
            Welcome to the meeting
        </>
    );

}

export default Meeting;