import './Profile.css'
import { useState } from 'react'

export default function Profile() {
    const [inputValue, setValue] = useState('')
    const [profile, setProfile] = useState({})
    const baseApiUrl = 'https://api.github.com/users/'

    function getProfile() {
        fetch(`${baseApiUrl}${inputValue}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => setProfile(data))
            .then(console.log(profile))
    }

    function reset() {
        setProfile({})
        setValue('')
    }

    if (profile && profile.id) return (
        <div className="profile-container">
            <img className='profile-img' alt='profile-img' src={profile.avatar_url}></img>
            <a href={`https://github.com/${profile.login}`} className='profile-link' target='_blank' data-tooltip='Click to view full profile'>{profile.login}</a>
            <p>Entered At: {profile.created_at.slice(0, 10)}</p>
            <p>Followers: {profile.followers}</p>
            <p>Following: {profile.following}</p>
            <p>Repositories: {profile.public_repos}</p>
            <p>Last Updated: {profile.updated_at.slice(0, 10)}</p>
            <button className='reset' type='button' onClick={reset}>New Search</button>
        </div>)
    else if (profile && profile.message === "Not Found") return (
        <div className='not-found'>
            <h2>User Not Found</h2>
            <button className='reset' type='button' onClick={reset}>New Search</button>
        </div>
    )
    else return (
        <div className="form-container">
            <input type="text" value={inputValue} onChange={e => setValue(e.target.value)} className="form-input" placeholder="Type a name to search"></input>
            <button type="submit" className="form-button" onClick={getProfile}>Search</button>
        </div>
    )
}