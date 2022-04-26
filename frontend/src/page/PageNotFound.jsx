import Desktop from "../layout/Desktop";
import Mobile from "../layout/Mobile";

function PageNotFound() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', fontFamily: "'Maven Pro', sans-serif" }}>
                <div className="position-absolute" style={{ fontWeight: '900', zIndex: '-1', opacity: '0.8' }} >
                    <Desktop className='' style={{ fontSize: '20rem', filter: 'blur(10px)' }}>
                        <div className='text-warning'>4</div>
                        <div className='text-danger'>0</div>
                        <div className='text-primary'>4</div>
                    </Desktop>
                    <Mobile style={{ fontSize: '50vw', filter: 'blur(10px)' }}>
                        <div className='text-warning'>4</div>
                        <div className='text-danger'>0</div>
                        <div className='text-primary'>4</div>
                    </Mobile>
                </div>
                <div className="mx-3" style={{ maxWidth: '800px' }}>
                    <div className="">
                        <Desktop className='h1 justify-content-center align-items-center my-2' style={{ fontWeight: '900', textAlign: 'center', textAlignLast: 'center', height: '5rem', borderRadius: '2.5rem', boxShadow: '0px 0px 50px -10px crimson', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                            WE ARE SORRY, PAGE NOT FOUND!
                        </Desktop>
                        <Mobile className='h2 justify-content-center align-items-center my-2' style={{ fontWeight: '900', textAlign: 'center', textAlignLast: 'center', height: '5rem', borderRadius: '2.5rem', boxShadow: '0px 0px 50px -10px crimson', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                            WE ARE SORRY, PAGE NOT FOUND!
                        </Mobile>
                    </div>
                    <div className="h4" style={{ textShadow: '0px 0px 0.2em rgba(150, 150, 150, 0.5)', fontWeight: '900', textAlign: 'center', textAlignLast: 'center', transform: 'translateY(2rem)' }}>
                        THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, OR HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.
                    </div>
                </div>

            </div>
        </>
    );
}

export default PageNotFound;