// import usePlacesAutocomplete from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";

// import "@reach/combobox/styles.css";
    
// const AutoComplete = () => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 43.6532, lng: () => -79.3832 },
//       radius: 100 * 1000,
//     },
//   });

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//         console.log(val);
//         setValue(val, false);
//         clearSuggestions();

//         try {
//             const results = await getGeocode({ address });
//             const { lat, lng } = await getLatLng(results[0]);
//             setlatitude(lat);
//             setlongitude(lng);
//             panTo({ lat, lng });
//         } catch (error) {
//             console.log("😱 Error: ", error);
//         }
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         top: "2rem",
//         left: "50%",
//         zIndex: "10",
//         width: "100%",
//         maxWidth: "400px",
//         transform: "translate(-25%)",
//       }}
//     >
//       <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList >
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );

  
// };


// export default AutoComplete;