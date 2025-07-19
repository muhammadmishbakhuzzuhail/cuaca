const LoadingPreviewCardCuaca = () => {
   return (
      <div className="relative rounded-sm w-[458px] h-[290px] bg-white py-2 space-y-2">
         <p className="relative mx-auto w-[200px] h-[25px] bg-gray-200/75 rounded-sm"></p>
         <p className="relative mx-auto w-[200px] h-[10px] bg-gray-200/75 rounded-sm"></p>
         <div className="grid grid-cols-2 gap-8">
            <div className="relative self-center bg-gray-200/75 w-[150px] h-[40px] mx-auto rounded-sm"></div>
            <div className="relative h-[128px] w-[200px] rounded-sm overflow-hidden bg-gray-200/75"></div>
         </div>
         <div className="relative w-[288px] h-[52px] rounded-full bg-gray-200/75 mx-auto"></div>
         <p className="relative mx-auto w-24 h-[10px] bg-gray-200/75 rounded-sm"></p>
      </div>
   );
};

export default LoadingPreviewCardCuaca;
