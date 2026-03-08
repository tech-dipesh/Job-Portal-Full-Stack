export default function Textcomps({content, size}){
  return <div className={`text-gray-100 ${size ? size: 'text-1xl'} font-medium m-6 hover:text-white transition-colors `}>{content}</div>
}