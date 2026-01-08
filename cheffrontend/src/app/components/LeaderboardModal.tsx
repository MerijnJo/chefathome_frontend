"use client";

import React, { useEffect, useCallback } from 'react';
import { useChefLeaderboard } from '../../hooks/useChefLeaderboard';
import type { Chef } from '../../types/Chef';
import styles from './LeaderboardModal.module.css';

interface LeaderboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
    const { chefs, connectionStatus, error } = useChefLeaderboard();

    const handleEscapeKey = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);


    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    // Add ESC key listener when modal is open
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleEscapeKey]);

    if (!isOpen) {
        return null;
    }


    const renderLoadingState = () => (
        <div className={styles.statusContainer}>
            <div className={styles.spinner} aria-label="Loading"></div>
            <p className={styles.statusText}>Verbinden met live leaderboard...</p>
        </div>
    );


    const renderErrorState = () => (
        <div className={styles.statusContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorText}>{error || 'Kan niet verbinden met de server'}</p>
            <p className={styles.errorSubtext}>Probeer het later opnieuw</p>
        </div>
    );

    const renderEmptyState = () => (
        <div className={styles.statusContainer}>
            <div className={styles.emptyIcon}>👨‍🍳</div>
            <p className={styles.emptyText}>Nog geen chefs in de leaderboard</p>
            <p className={styles.emptySubtext}>Begin met het bekijken van chef profielen!</p>
        </div>
    );


    const getRankIcon = (rank: number): string => {
        switch (rank) {
            case 1:
                return '🏆';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return '';
        }
    };


    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = '/images/placeholder-chef.png';
        event.currentTarget.onerror = null; // Prevent infinite loop
    };


    const renderLeaderboard = () => (
        <div className={styles.leaderboardList}>
            {chefs.map((chef: Chef, index: number) => {
                const rank = index + 1;
                const rankIcon = getRankIcon(rank);

                return (
                    <div
                        key={chef.id}
                        className={`${styles.chefEntry} ${rank === 1 ? styles.topChef : ''}`}
                        role="listitem"
                    >
                        <div className={styles.rankSection}>
                            <span className={styles.rankNumber}>{rank}</span>
                            {rankIcon && <span className={styles.rankIcon}>{rankIcon}</span>}
                        </div>

                        <div className={styles.avatarSection}>
                            <img
                                src={chef.profilePicture || '/images/placeholder-chef.png'}
                                alt={`${chef.name} profile`}
                                className={styles.avatar}
                                onError={handleImageError}
                                loading="lazy"
                            />
                        </div>

                        <div className={styles.infoSection}>
                            <h3 className={styles.chefName} title={chef.name}>
                                {chef.name}
                            </h3>
                        </div>

                        <div className={styles.viewsSection}>
                            <span className={styles.viewIcon} aria-hidden="true">👁️</span>
                            <span className={styles.viewCount}>
                                {chef.viewCount.toLocaleString('nl-NL')}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="leaderboard-title"
        >
            <div className={styles.modal}>
                {/* Modal Header */}
                <div className={styles.header}>
                    <h2 id="leaderboard-title" className={styles.title}>
                        🏆 Top 5 Chefs Live
                    </h2>
                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                        aria-label="Sluit leaderboard"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Content */}
                <div className={styles.content}>
                    {connectionStatus === 'connecting' && renderLoadingState()}
                    {connectionStatus === 'error' && renderErrorState()}
                    {connectionStatus === 'connected' && chefs.length === 0 && renderEmptyState()}
                    {connectionStatus === 'connected' && chefs.length > 0 && renderLeaderboard()}
                </div>

                {/* Live Indicator */}
                {connectionStatus === 'connected' && (
                    <div className={styles.liveIndicator}>
                        <span className={styles.liveDot}></span>
                        <span className={styles.liveText}>Live updates</span>
                    </div>
                )}
            </div>
        </div>
    );
}
